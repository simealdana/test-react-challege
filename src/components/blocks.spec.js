import Blocks from './Blocks';
import { shallow } from "enzyme";
 
describe("<Blocks />",()=>{
    const blocks = [
        {
          id: "1",
          type: "blocks",
          attributes: {
            index: 1,
            timestamp: 1530677153,
            data: "By reason of these things",
            hash: "nzl9y9lf4NdSQZCw293n5ICLniP6GnWecWcvAjWKjnc=",
          },
        },
      ]
    it('should  have one block',()=>{
        const wrapper = shallow(
            <Blocks
              blocks={blocks}
            />
          );
        expect(wrapper.children().length).toBe(1)
    });

    it('should do not have any block',()=>{
        const wrapper = shallow(
            <Blocks
              blocks={null}
            />
          );
        expect(wrapper.children().length).toBe(1);
        const isLoading = `${wrapper.html()}`.includes("LOADING...");
        expect(isLoading).toBe(true);
    });

    it('should be empyt result',()=>{
        const wrapper = shallow(
            <Blocks
              blocks={[]}
            />
          );
        expect(wrapper.children().length).toBe(1);
        const isEmpyt = `${wrapper.html()}`.includes("THERE ARE NOT BLOCKS");
        expect(isEmpyt).toBe(true);
    });
});