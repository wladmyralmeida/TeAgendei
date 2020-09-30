import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';

import IStorageProvider from '../models/IStorageProvider';

interface IStorageFile {
    file: string;
}

class FakeStorageProvider implements IStorageProvider {
    private storage: string[] = [];

    public async saveFile(file: string): Promise<string> {
        this.storage.push(file);

        return file;
    }

    public async deleteFile(file: string): Promise<void> {
        const findIndex = this.storage.findIndex(
            storageFile => storageFile === file,
        );

        //Deletar o arquivo na posição 1;
        this.storage.splice(findIndex, 1);
    }
}

export default FakeStorageProvider;
