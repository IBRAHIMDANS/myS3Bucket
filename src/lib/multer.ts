import multer, { StorageEngine } from 'multer';
import { getRepository } from 'typeorm';
import { Bucket } from '../entity/Bucket';

const storage: StorageEngine = multer.diskStorage({
    destination: async (req: Request, file: File, cb: Function): Function => {
        const { uuid, id } = req.params;
        const bucket = await getRepository(Bucket).findOne(id);

        await cb(null, process.env.STORAGE + "/" + uuid + "/" + bucket.name)
    },
    filename: async (req, file, cb) => {
        await cb(null, file.originalname)
    }
});

export const upload = multer({ storage });
