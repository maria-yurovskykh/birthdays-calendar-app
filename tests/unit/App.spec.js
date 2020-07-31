import {
  shallowMount
} from "@vue/test-utils";
import "whatwg-fetch";
import App from "../../src/App.vue";

describe("App.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(App, {});
  });

  it("should be a Vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  describe("getMonthClass", () => {
    let months;

    it("should be a function", () => {
      expect(typeof wrapper.vm.getMonthClass).toBe("function");
    });

    it("should return string 'grey' if the length of provided `month` key is less then or equal 2", () => {
      months = {
        "January": [{}, {}],
      };
      
      expect(wrapper.vm.getMonthClass(months, "January")).toBe("grey");
    });

    it("should return string 'blue' if the length of provided `month` key is less then or equal 6", () => {
      months = {
        "January": [{}, {}, {}, {}, {}],
      };

      expect(wrapper.vm.getMonthClass(months, "January")).toBe("blue");
    });

    it("should return string 'green' if the length of provided `month` key is less then or equal 10", () => {
      months = {
        "January": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      };

      expect(wrapper.vm.getMonthClass(months, "January")).toBe("green");
    });

    it("should return string 'red' if the length of provided `month` key is higher then or equal 11", () => {
      months = {
        "January": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      };

      expect(wrapper.vm.getMonthClass(months, "January")).toBe("red");
    });
  });

  describe("mouseOver", () => {
    it("should be a function", () => {
      expect(typeof wrapper.vm.mouseOver).toBe("function");
    });

    it("should assign a value to `activeMonth` and `usersListByMonth`", () => {
      wrapper.vm.usersMapByMonths = {
        "month": [{}, {}, {}],
      };
      wrapper.vm.mouseOver("month");

      expect(typeof wrapper.vm.activeMonth).toBe("string");
      expect(wrapper.vm.activeMonth).toBe("month");

      expect(typeof wrapper.vm.usersListByMonth).toBe("object");
      expect(wrapper.vm.usersListByMonth).toEqual([{}, {}, {}]);
    });
  });

  describe("mouseLeave", () => {
    it("should be a function", () => {
      expect(typeof wrapper.vm.mouseLeave).toBe("function");
    });

    it("should reset a value of `usersListByMonth` by assigning a `null` to it", () => {
      wrapper.vm.usersMapByMonths = {
        "month": [{}, {}, {}],
      };
      wrapper.vm.mouseOver("month");

      expect(wrapper.vm.usersListByMonth).toEqual([{}, {}, {}]);

      wrapper.vm.mouseLeave();

      expect(wrapper.vm.usersListByMonth).toEqual(null);
    });
  });
});
