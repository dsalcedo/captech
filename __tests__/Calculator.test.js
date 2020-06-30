import { mount } from '@vue/test-utils'
import CalculatorComponent from '../resources/js/components/CalculatorComponent'

describe('Calculator.test.js', () => {
    const wrapper = mount(CalculatorComponent)

    test('is a Vue instance', () => {
        expect(wrapper.exists()).toBeTruthy()
    });

    test('add digits', () => {
        wrapper.vm.add(1);
        wrapper.vm.handle("+");
        wrapper.vm.add(1);
        wrapper.vm.handle("=");

        expect(wrapper.vm.$data.operations_display).toBe("1 + 1 =");
    });

    test('solve sum operation', () => {
        wrapper.vm.add(2);
        wrapper.vm.handle("+");
        wrapper.vm.add(3);
        wrapper.vm.handle("=");

        expect(wrapper.vm.$data.valueDisplay).toBe(5)
    });

    test('solve subtraction operation', () => {
        wrapper.vm.add(10);
        wrapper.vm.handle("-");
        wrapper.vm.add(100);
        wrapper.vm.handle("=");

        expect(wrapper.vm.$data.valueDisplay).toBe(-90)
    });

    test('solve multiplication operation', () => {
        wrapper.vm.add(5);
        wrapper.vm.handle("*");
        wrapper.vm.add(45);
        wrapper.vm.handle("=");

        expect(wrapper.vm.$data.valueDisplay).toBe(225)
    });

    test('solve division operation', () => {
        wrapper.vm.add(10);
        wrapper.vm.handle("/");
        wrapper.vm.add(8);
        wrapper.vm.handle("=");

        expect(wrapper.vm.$data.valueDisplay).toBe(1.25)
    });

    test('solve complex operation', () => {
        wrapper.vm.add(-100);
        wrapper.vm.handle("+");
        wrapper.vm.add(99);
        wrapper.vm.handle("*");
        wrapper.vm.add(3);
        wrapper.vm.handle("/");
        wrapper.vm.add(5);
        wrapper.vm.handle("*");
        wrapper.vm.add(1.97);
        wrapper.vm.handle("/");
        wrapper.vm.add(0.76);
        wrapper.vm.handle("-");
        wrapper.vm.add(1.66);
        wrapper.vm.handle("+");
        wrapper.vm.add(.37);
        wrapper.vm.handle("=");

        expect(wrapper.vm.$data.valueDisplay).toBe(1.25)
    });
});
