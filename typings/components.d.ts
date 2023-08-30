// For this project development
import '@vue/runtime-core'

declare module '@vue/runtime-core' {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    OOMDateRangePicker: typeof import('../packages/element-plus-encapsulation')['DateRangePicker']
  }
}

export {}
