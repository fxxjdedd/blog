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

    varying vec2 vUv;
    uniform sampler2D map;
    uniform vec2 resolution;
    uniform float time;
    uniform float randomBlockId;
    uniform vec2 mousePosition;
    const float rot = 30.0/180.0*3.14159265359;
    const mat2 rotMat = mat2(cos(rot), -sin(rot), sin(rot), cos(rot));


    float circle(vec2 uv, vec2 center, float radius) {
      return smoothstep(radius-0.02, radius+0.02, distance(uv, center));
    }

    void main() {
      vec2 uv = vUv * 2.0 - 1.0;

      uv.x *= resolution.x / resolution.y;

      uv *= 0.8;
      uv += vec2(TIME, TIME);
      uv = rotMat * uv;


      vec2 mouseUV = mousePosition;
      mouseUV = mouseUV * 2.0 - 1.0;
      mouseUV.x *= resolution.x / resolution.y;

      mouseUV *= 0.8;
      mouseUV += vec2(TIME, TIME);
      mouseUV = rotMat * mouseUV;

      vec3 col = texture2D(map, uv).rgb;

      vec2 blockUV = (fract(uv * 4.0) + 1.0 / 2.0);
      vec2 blockId = floor(uv * 4.0);
      vec2 mouseBlockId = floor(mouseUV * 4.0);
      vec2 mouseBlockUV = (fract(mouseUV * 4.0) + 1.0 / 2.0);
      float dist = distance(blockUV, mouseBlockUV);

      float circleDist = circle(uv, mouseUV, 0.1);
      vec3 blockColor = col;

      if (blockId.x == mouseBlockId.x && blockId.y == mouseBlockId.y) {
        blockColor = mix((1.0 - col), col, 1.0 - circleDist);
      } else {
        blockColor = 1.0 - col;
      }

      blockColor = mix((1.0-col), col, (1.0-circleDist));
      
      gl_FragColor = vec4(blockColor, 0.8);
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

export default function VFXLogoWall(props: { reverseColor: boolean }) {
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
