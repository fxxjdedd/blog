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
    const float rot = 30.0/180.0*3.14159265359;
    const mat2 rotMat = mat2(cos(rot), -sin(rot), sin(rot), cos(rot));
    void main() {
      vec2 uv = vUv * 2.0 - 1.0;
      uv.x *= resolution.x / resolution.y;

      uv *= 0.8;
      uv += vec2(time*0.1, time*0.1);
      uv = rotMat * uv;


      vec3 col = texture2D(map, uv).rgb;
#ifdef REVERSE_COLOR
      col.rgb = 1.0 - col.rgb;
#endif


      vec2 currentBlock = fract(uv * 4.0);

      vec3 blockColor = currentBlock.x * col;

      

      gl_FragColor = vec4(blockColor, 0.8);
    }
  `,
};

function LogoWall(props: { reverseColor: boolean }) {
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
