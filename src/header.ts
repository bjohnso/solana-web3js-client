export interface HeaderInterface {
    numRequiredSigs: number,
    numReadOnlyAddressesRequiringSigs: number,
    numReadOnlyAddressesNotRequiringSigs: number,
}

export class Header {
    numRequiredSigs: number = 0;
    numReadOnlyAddressesRequiringSigs: number = 0;
    numReadOnlyAddressesNotRequiringSigs: number = 0;

    private constructor(data: HeaderInterface) {
        Object.assign(this, data);
    }

    static factory(data: HeaderInterface) {
        return new Header(data);
    }
}
