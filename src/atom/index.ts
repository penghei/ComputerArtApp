import { atom, selector } from "recoil";
import { fruits } from "../asserts/fruits";
import NoImg from "../asserts/noimg.jpg";

export const ResultInfo = atom({
  key: "ResultInfo",
  default: {
    canSee: false,
    value: {
      disease: "",
      solutions: "",
    },
  },
});

export const SelectedFruit = atom({
  key: "SelectedFruit",
  default: "corn",
});

export const SelectedFruitFilter = selector({
  key: "SelectedFruitFilter",
  get: ({ get }) => {
    const selectedFruit = get(SelectedFruit);
    const res = fruits.find((fruit) => fruit.engName === selectedFruit);
    if (res) return res;
    else return {
      name: "",
      desp: "",
      disease: "",
      img: NoImg,
      sicks:[]
    }
  },
});

export const ModalTypes = atom({
  key:'ModalTypes',
  default:'leaf'
})