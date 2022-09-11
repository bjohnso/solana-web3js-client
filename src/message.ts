import {Buffer} from "buffer";
import {Header, HeaderInterface} from "./header";
import bs58 from "bs58";

export class Message {
    header: Header;

    constructor(
        headerParams: HeaderInterface,
        accountAddresses: string[]
    ) {
        this.header = Header.factory(headerParams);
    }

    private base58StringToBuffer(base58String: string): Buffer {
        return Buffer.from(
            bs58.decode(base58String)
        );
    }
}
