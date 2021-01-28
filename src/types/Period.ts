export class Period {
    fom: string;

    tom: string;

    constructor(periodenøkkel: string) {
        const [fomValue, tomValue] = periodenøkkel.split('/');
        this.fom = fomValue;
        this.tom = tomValue;
    }
}
