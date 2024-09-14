"use client";

import React, { useMemo } from "react";
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
    varying vec2 vUv;
    uniform sampler2D map;
    uniform vec2 resolution;
    uniform float time;
    void main() {
      vec2 uv = vUv * 2.0 - 1.0;
      uv.x *= resolution.x / resolution.y;

      uv *= 0.8;
      uv += vec2(time*0.1, time*0.1);

      vec3 col = texture2D(map, uv).rgb;
      gl_FragColor = vec4(col, 0.8);
    }
  `,
};

function LogoWall() {
  const uniforms = useMemo(() => {
    const texture = new TextureLoader().load("/assets/textures/bg-wall.jpg");
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    return {
      time: { value: 0 },
      resolution: { value: new Vector2() },
      map: { value: texture },
    };
  }, []);

  useFrame((state) => {
    uniforms.time.value = state.clock.elapsedTime;
    uniforms.resolution.value.set(
      state.size.width * state.viewport.dpr,
      state.size.height * state.viewport.dpr
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
        blending={AdditiveBlending}
      />
    </mesh>
  );
}

export default function VFXStar() {
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
      <LogoWall />
    </Canvas>
  );
}
