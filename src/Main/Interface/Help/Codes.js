class Codes{

    bubbleSort = '# procedure:    bubbleSort\n# Objective:    sort an array of integer elements in nondecreasing order\n# Input:        an address of an array of integers\n# Output:       an array sorted in nondecreasing order\n# Please observe the data segment before and after running the program to observe the sorted array\n\n.data\narray:\n	.word 90, 67, 30, 1, 45, 50, 11, 33, 67, 19, 2\n.text\n.globl main\nmain:\n\nbubbleSort:\n\n\nlui     $t0, 0x1001\nli      $t1, 0     # i = 0;\nli      $t2, 0      # j = 0;\nli      $s1, 10      # array length\nloop:\nbeq     $t1, $s1, exit       # exit if i == length of array -1\nlui     $t0, 0x1001\nli      $t2, 0      # j = 0;\nforLoop:\nbeq     $t2, $s1, exitForLoop   # exit loop if j==length of array -1\nlw      $a0, 0($t0)         # a0 = array[j]\nlw      $a1, 4($t0)         # a1 = array[j+1]\nble     $a0, $a1, update        # if array[j]<=array[j+1] skip\nsw      $a1, 0($t0)         # a[j+1] = a[j]\nsw      $a0, 4($t0)         # a[j] = a[j+1]\nupdate:\naddiu   $t2, $t2, 1         # j++\n#sll     $t3, $t2, 2         # t3 = j*4\naddiu    $t0, $t0, 4        # point to next element -->\nj       forLoop\nexitForLoop:\naddiu   $t1, $t1, 1  # i++;\nj   loop\nexit:\njr      $ra';

    testcode = '# A program to check sll, srl, li and syscall commands\nmain:\nli $v0, 4\nli $a0, 20\nsrl $a0, $a0, 1\t# dividing by 2\nsll $a0, $a0, 1\t# multiply by 2\nsyscall\nli $v0, 1\nli $a0, 5\nsyscall\t\t\t# printing 5 on the console\nli $v0, 10\nli $a0, 5\nsyscall';

    fibonacci = '.data\n.word 6\n\n.text\n.globl main\n\nmain:\n\nli $t0, 0x10010000\nlw $s0, 0($t0)\n\naddi $s0, $s0, 1				# $s0=n+1\n\naddi $s1, $s1, 1				# $s1=1 always\n\naddi $t0, $zero, 1				# loop variable i=1\n\naddi $t1, $t1, 0				# prev1\naddi $t2, $t2, 0				# prev2\n\naddi $s2, $s2, 1				# result\n\nLoop:\n\nbeq $t0, $s0, Exit\n\nbeq $t0, $s1, One\nj Exitone\n\nOne:\naddi $t1, $t1, 1\naddi $t0, $t0, 1\nj Loop\n\nExitone:\nadd $s1, $t1, $t2\naddi $t0, $t0, 1\naddi $t2, $t1, 0\naddi $t1, $s1, 0\nj Loop\n\nExit:\n\nli $v0, 1\naddi $a0, $s1, 0\nsyscall\n\njr $ra\n';

    arithmetic = '# addition and subtraction of two numbers\n.data\n\n.text\naddi $t0, $t0, 5        # load 5\naddi $t1, $t1, 10       # load 10\n\nadd $t2, $t0, $t1       # 5+10\nsub $t3, $t0, $t1       # 5-10\n\nli $v0, 1               # print results\naddi $a0, $t2, 0\nsyscall\naddi $a0, $t3, 0\nsyscall';

    piptest1 = '.data\n\t.word 12, 14, 16, 15\n\n.text\n.globl main\n\nmain:\n\tli $t2, 0x10010000\n\taddi $t3, $t3, 12\n\n\tlw $t1, 0($t2)\n\tbeq $t1, $t3, Address\nAddress:\n\tadd $t1, $t2, $t3\n\tsub $t3, $t1, $t2\n\tsub $t4, $t1, $t3\n\n\tli $t3, 0x10010004\n\n\tlw $t4, 0($t3)\n\tadd $t1, $t4, $t2\n\tsw $t1, 0($t3)\n\tlw $t2, 0($t3)\n\taddi $t3, $t3, 4\n\t# add $t3, $t4, $t5\n\tlw $t6, 0($t3)\n\tsub $t5, $t6, $t3\n\tbeq $t1, $t2, Loop\nLoop:\n\tsw $t5, 0($t3)\n\tjr $ra';

    piptest2 = '.data\n\t	.word 12\n\n.text\n.globl main\n\nmain:\n\n\t	li $t4, 0x10010000\n\n\t	add $t1, $t2, $t3\n\t	sub $t3, $t1, $t2\n\t	sub $t2, $t1, $t2\n\t	lw $t1, 0($t4)\n\t	add $t2, $t1, $zero\n\t	sw $t2, 0($t4)\n\t	lw $t3, 0($t4)\n\t	add $t1, $t2, $t1\n\t	lw $t5, 0($t4)\n\t	sw $t5, 4($t4)\n\n\t	jr $ra\n';

    piptest3 = '.data\n.word 268500996, 8\n\n.text\n.globl main\n\nmain:\n\n\t\t    li $t3, 0x10010000\n\n\t	add $t1, $t2, $zero\n\t	beq $t1, $zero, Next\n\nNext:\n\t	sub $t2, $t1, $t2\n\t	lw $t1, 0($t3)\n\t	lw $t2, 0($t1)\n\t	bne $t1, $t2, Next2\n\nNext2:\n\t	addi $t1, $zero, 0\n\t	beq $zero, $zero, Next3\n\nNext3: sw $t1, 0($t3)\n\n\t	jr $ra';

}
 
export default Codes;
