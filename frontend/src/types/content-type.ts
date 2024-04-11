export interface Content {
   blocks: {
      id: string;
      type: string;
      data: {
         text?: string;
         style?: string;
         items?: string[];
      };
   }[];
   version: string;
   timestamp?: string
}
