// components.d.ts
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    RouterLink: (typeof import('vue-router'))['RouterLink']
    RouterView: (typeof import('vue-router'))['RouterView']
    BaseBlock: typeof import('./src/components/BaseBlock/index.vue')
    BasePageHeading: typeof import('./src/components/BasePageHeading/index.vue')
  }
}

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}

export {}
