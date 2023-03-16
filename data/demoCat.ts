import { CategoryDataObj, ServiceDataObj } from "../types/api/categoryDataObj";

export const demoCat: CategoryDataObj[] = [
  {
    license: "none",
    media: require("../assets/test-media/musician.png"),
    name: "Musicians",
    priviledge: "freemium",
  },
  {
    license: "none",
    media: require("../assets/test-media/child.png"),
    name: "Child Performer",
    priviledge: "freemium",
  },
  {
    license: "none",
    media: require("../assets/test-media/food.png"),
    name: "Food & Drinks",
    priviledge: "freemium",
  },
  {
    license: "none",
    media: require("../assets/test-media/event.png"),
    name: "Event Travel",
    priviledge: "freemium",
  },
];

export const demoServices: ServiceDataObj[] = [
  {
    license: "",
    media: require("../assets/test-media/sub/keyboardist.png"),
    name: "Keyboardist",
    parent: "Musicians",
    priviledge: "freemium",
  },

  {
    license: "",
    media: require("../assets/test-media/sub/drummer.png"),
    name: "Drummer",
    parent: "Musicians",
    priviledge: "freemium",
  },
  {
    license: "",
    media: require("../assets/test-media/sub/bass.png"),
    name: "Bass Guitarist",
    parent: "Musicians",
    priviledge: "freemium",
  },
  {
    license: "",
    media: require("../assets/test-media/sub/electric.png"),
    name: "Electric Guitarist",
    parent: "Musicians",
    priviledge: "freemium",
  },
  {
    license: "",
    media: require("../assets/test-media/sub/acoustic.png"),
    name: "Acoustic Guitarist",
    parent: "Musicians",
    priviledge: "freemium",
  },
];
