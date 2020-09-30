import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';

import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
    public async saveFile(file: string): Promise<string> {
        //Mover o arquivo para a pasta de efetivação uploads;
        await fs.promises.rename(
            path.resolve(uploadConfig.tmpFolder, file),
            path.resolve(uploadConfig.uploadsFolder, file),
        );

        return file;
    }

    public async deleteFile(file: string): Promise<void> {
        const filePath = path.resolve(uploadConfig.uploadsFolder, file);

        try {
            //Forma de saber se ele encontrou o arquivo, ou seja, se há um caminho válido;
            await fs.promises.stat(filePath);
        } catch {
            return;
        }

        //Deletar o arquivo;
        await fs.promises.unlink(filePath);
    }
}

export default DiskStorageProvider;
