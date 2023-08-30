// GlobalComponents for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    OomDateRangePicker: typeof import('@instance-oom/element-plus-encapsulation')['DateRangePicker']
  }
}
export { }