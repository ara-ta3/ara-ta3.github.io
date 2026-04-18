import { getAllSlides, type Slide } from "@/utils/slides";

export type Data = {
  slides: Slide[];
};

export default async function data(): Promise<Data> {
  return {
    slides: getAllSlides(),
  };
}
