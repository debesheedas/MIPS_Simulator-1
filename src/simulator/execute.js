import processor from "./processor";

//add $t1, $t2, $t3
var execute = 
{
    //temp:4//dummy check
};
//this function takes all the non empty lines of code as an array named lines, all the jump tags in a map named tags 
//and pc which is the index of the instruction to execute in the lines array
execute.exe = (lines, tags, pc) =>
{
    if(lines==null)
    {
        pc = 0;
        return pc;
    }
    let line = lines[pc]
    // console.log("Instruction number pc")
    if(line[0]=="" || line[0]=="#")
    {
        pc = pc+1
    }
    else if(line[0].includes(":") && line.length===1)
    {
        pc = pc+1
    }
    else if(line[0]==="add" || line[0]==="addu")
    {
        let src1 = line[2].replace("$", "")
        let src2 = line[3].replace("$", "")
        let dest = line[1].replace("$", "")
        //console.log(processor.registers)
        let val1 = processor.getRegister(src1)
        let val2 = processor.getRegister(src2)
        processor.setRegister(dest, (val1+val2))
        pc = pc+1
    }
    else if(line[0]==="sub")
    {
        let src1 = line[2].replace("$", "")
        let src2 = line[3].replace("$", "")
        let dest = line[1].replace("$", "")
        //console.log(processor.registers)
        let val1 = processor.getRegister(src1)
        let val2 = processor.getRegister(src2)
        processor.setRegister(dest, (val1-val2))
        pc = pc+1
    }
    else if(line[0]==="addi" || line[0]==="addiu")//check if difference between addi and addiu matters
    {
        let src1 = line[2].replace("$", "")
        let src2 = parseInt(line[3])
        // console.log(src2)
        // console.log(typeof src2)
        let dest = line[1].replace("$", "")
        //console.log(processor.registers)
        let val1 = processor.getRegister(src1)
        let val2 = src2
        processor.setRegister(dest, (val1+val2))
        pc = pc+1
    }
    //bne $t2, $s0, main
    else if(line[0]==="bne")
    {
        let src1 = line[1].replace("$", "")
        let src2 = line[2].replace("$", "")
        let dest = tags.get(line[3]+":")
        // console.log(typeof dest)
        // console.log(dest)
        let val1 = processor.getRegister(src1)
        let val2 = processor.getRegister(src2)
        if(val1!=val2)
        {
            pc = dest
        }
        else
        {
            pc = pc+1
        }
    }
    else if(line[0]==="beq")
    {
        let src1 = line[1].replace("$", "")
        let src2 = line[2].replace("$", "")
        let dest = tags.get(line[3]+":")
        // console.log(typeof dest)
        // console.log(dest)
        let val1 = processor.getRegister(src1)
        let val2 = processor.getRegister(src2)
        if(val1===val2)
        {
            pc = dest
        }
        else
        {
            pc = pc+1
        }
    }
    else if(line[0]==="ble")
    {
        let src1 = line[1].replace("$", "")
        let src2 = line[2].replace("$", "")
        let dest = tags.get(line[3]+":")
        // console.log(typeof dest)
        // console.log(dest)
        let val1 = processor.getRegister(src1)
        let val2 = processor.getRegister(src2)
        if(val1<=val2)
        {
            pc = dest
        }
        else
        {
            pc = pc+1
        }
    }
    else if(line[0]==="j")
    {
        let dest = tags.get(line[1]+":")
        console.log(typeof dest)
        console.log(dest)
        pc = dest
    }
    else if(line[0]==="li")
    {
        let src1 = parseInt(line[2])
        let dest = line[1].replace("$", "")
        //console.log(processor.registers)
        processor.setRegister(dest, src1)
        pc = pc+1
    }
    else if(line[0]==="lui")
    {
        let src1 = parseInt(line[2])
        let dest = line[1].replace("$", "")
        //console.log(processor.registers)
        processor.setRegister(dest, src1*(2**16))
        pc = pc+1
    }
    else if(line[0]==="lw")
    {
        let src = line[2].split("(")
        let offset = parseInt(src[0])
        let src1 = src[1].replace("$", "").replace(")", "")
        let src2 = offset + processor.getRegister(src1)
        let dest = line[1].replace("$", "")
        //console.log(processor.registers)
        let value = processor.getMemory(src2)
        processor.setRegister(dest, value)
        pc = pc+1
    }
    else if(line[0]==="sw")
    {
        let dest = line[2].split("(")
        let offset = parseInt(dest[0])
        let dest1 = dest[1].replace("$", "").replace(")", "")
        let dest2 = offset + processor.getRegister(dest1)
        let src = line[1].replace("$", "")
        //console.log(processor.registers)
        let value = processor.getRegister(src)
        processor.setMemory(dest2, value)
        pc = pc+1
    }
    
    else if(line[0]==="syscall")
    {
        let code = processor.getRegister("v0")
        switch(code)
        {
            case 1:
                this.props.console.printToConsole(1, 4);
                //print the integer stored in $a0 on the console
                break;
            case 4:
                //print the string whose address is store in $a0, on the console
                break;
            case 10:
                pc=0
                //exit
                break;
        }
        pc = pc+1
    }
    else
    {
        pc=pc+1
    }
    if(pc===lines.length)//if pc has reached the end of the lines pf code, reinitialize to 0, ready for the next step or run
    {
        pc=0
    }
    return pc
    //console.log(pc)
    //console.log(lines)
    
    //console.log(processor.registers)
    
    /* console.log(line)
    pc = pc+1
    line = lines[pc]
    console.log("Instruction number pc")
    console.log(line) */
}

export default execute