"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  AdditiveBlending,
  MultiplyBlending,
  NormalBlending,
  SubtractiveBlending,
  Vector2,
  TextureLoader,
  RepeatWrapping,
} from "three";
import { FullScreenQuad } from "three/examples/jsm/Addons.js";

const StarShader = {
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `

    #define TIME time*0.01
    #define MAX_STEPS 100
    #define MAX_DIST 100.0
    #define SURFACE_DIST 0.01

    varying vec2 vUv;
    uniform sampler2D map;
    uniform vec2 resolution;
    uniform float time;
    uniform float randomBlockId;
    uniform vec2 mousePosition;
    const float rot = 30.0/180.0*3.14159265359;
    const mat2 rotMat = mat2(cos(rot), -sin(rot), sin(rot), cos(rot));

    vec3 rotateAroundY(vec3 p, float angle) {
      mat2 rotMat = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
      vec2 xz = rotMat * p.xz;
      return vec3(xz.x, p.y, xz.y);
    }


    float sphereSDF(vec3 p, float radius) {
        return length(p) - radius;
    }

    float rayMarching(vec3 ro, vec3 rd) {
      float depth = 0.0;
      for (int i = 0; i < MAX_STEPS; i++) {
        vec3 p = ro + rd * depth;
        float d = sphereSDF(p, 1.0);
        depth += d;
        if (depth > MAX_DIST || d < SURFACE_DIST) break;
      }
      return depth;
    }

    vec2 postionToUVCoord(vec3 p) {
      return vec2(atan(p.x, p.z), asin(p.y));
    }
    
    const float fov = 45.0;
    const float camZ = 1.3;
    const vec2 move = vec2(-0.5, 0.5);

    void main() {
      vec2 uv = vUv * 2.0 - 1.0;
      uv.x *= resolution.x / resolution.y;

      float distEyeToNearPlane = 1.0 / tan(radians(fov * 0.5));
      vec3 ro = vec3(vec2(0.0, 0.0) + move, camZ);
      vec3 rayCastPoint = vec3(uv + move, camZ - distEyeToNearPlane);
      vec3 rd = normalize(rayCastPoint - ro);

      float dist = rayMarching(ro, rd);

      if (dist > MAX_DIST - SURFACE_DIST) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        return;
      }

      vec3 p = ro + rd * dist;
      p = rotateAroundY(p, -TIME);



      vec2 tUV = postionToUVCoord(p);
      vec3 color = texture2D(map, tUV * 2.0).rgb;

      gl_FragColor = vec4(color, 1.0);
    }
  `,
};

function LogoWall(props: { reverseColor: boolean }) {
  const mousePositionRef = useRef(new Vector2(0, 0));

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePositionRef.current.set(
        event.clientX / window.innerWidth,
        1 - event.clientY / window.innerHeight // Invert Y-axis
      );
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const uniforms = useMemo(() => {
    const texture = new TextureLoader().load("/assets/textures/bg-wall.jpg");
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    return {
      time: { value: 0 },
      resolution: { value: new Vector2() },
      map: { value: texture },
      randomBlockId: { value: 0 },
      mousePosition: { value: new Vector2() },
    };
  }, []);

  const defines = useMemo(() => {
    if (props.reverseColor) {
      return {
        REVERSE_COLOR: 1,
      };
    } else {
      return {};
    }
  }, [props.reverseColor]);

  console.log("defines", defines);

  useFrame((state) => {
    uniforms.time.value = state.clock.elapsedTime;
    uniforms.resolution.value.set(
      state.size.width * state.viewport.dpr,
      state.size.height * state.viewport.dpr
    );
    uniforms.randomBlockId.value = Math.floor(Math.random() * 4);
    uniforms.mousePosition.value.set(
      mousePositionRef.current.x,
      mousePositionRef.current.y
    );
  });

  const viewport = useThree((state) => state.viewport);

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry></planeGeometry>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={StarShader.vertexShader}
        fragmentShader={StarShader.fragmentShader}
        defines={defines}
        blending={NormalBlending}
      />
    </mesh>
  );
}

export default function VFXLogoSphere(props: { reverseColor: boolean }) {
  return (
    <Canvas
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: "0.5rem",
      }}
    >
      <LogoWall reverseColor={props.reverseColor} />
    </Canvas>
  );
}
