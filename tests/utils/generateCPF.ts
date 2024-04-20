export function generateCPF(): string {
    const cpfArray: number[] = [];

    // Generate random digits for the CPF
    for (let i = 0; i < 9; i++) {
        cpfArray.push(Math.floor(Math.random() * 10));
    }

    // Calculate the first verification digit
    let sum = cpfArray.reduce((acc, digit, index) => {
        return acc + digit * (10 - index);
    }, 0);
    let digit1 = sum % 11;
    if (digit1 > 9) {
        digit1 = 0;
    }
    cpfArray.push(digit1);

    // Calculate the second verification digit
    sum = cpfArray.reduce((acc, digit, index) => {
        return acc + digit * (11 - index);
    }, 0);
    let digit2 = sum % 11;
    if (digit2 > 9) {
        digit2 = 0;
    }
    cpfArray.push(digit2);

    // Format the CPF as a string
    const cpf = cpfArray.join("");

    return cpf;
}
