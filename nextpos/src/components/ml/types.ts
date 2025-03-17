/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Layer {
    id: string
    type: string
    args: Record<string, any>
  }
  
  export type ModelType = 'classification' | 'regression'
  
  