import * as fs from 'fs';
import * as rimraf from 'rimraf';
import mkdirp from 'mkdirp';

export function createDirectoryAction(dir: string) {
    if (fs.existsSync(`${process.env.MYS3Storage}`)) {
        if (!fs.existsSync(`${process.env.MYS3Storage}/${dir}`)) {
            return mkdirp(`${process.env.MYS3Storage}/${dir}`, err => {
                err ? console.log(err) : console.log('folder create');
            });
        }
    }
}

export function removeDirectoryAction(dir: string) {
    if (fs.existsSync(`${process.env.MYS3Storage}`)) {
        if (fs.existsSync(`${process.env.MYS3Storage}/${dir}`)) {
            return rimraf.sync(`${process.env.MYS3Storage}/${dir}`);
        }
    }
}

export function renameDirectoryAction(dir?: string) {
    if (fs.existsSync(`${process.env.MYS3Storage}`)) {
        if (!fs.existsSync(`${process.env.MYS3Storage}/${dir}`)) {
            return fs.rename(`${process.env.MYS3Storage}/${dir}`);
        }
    }
}

// export function createBlobAction(id: string, bucket?: string) {
//     if (fs.existsSync(`${process.env.MYS3Storage}`)) {
//         if (!fs.existsSync(`${process.env.MYS3Storage}/${id}`)) {
//             return fs.mkdirSync(`${process.env.MYS3Storage}/${id}`);
//         }
//     }
// }
// export function renameBlobAction(id: string, bucket?: string) {
//     if (fs.existsSync(`${process.env.MYS3Storage}`)) {
//         if (!fs.existsSync(`${process.env.MYS3Storage}/${id}`)) {
//             return fs.mkdirSync(`${process.env.MYS3Storage}/${id}`);
//         }
//     }
// }
// export function removeBlobAction(id: string, blob?: Blob) {
//     if (fs.existsSync(`${process.env.MYS3Storage}`)) {
//         if (fs.existsSync(`${process.env.MYS3Storage}/${id}`)) {
//             return rimraf.sync(`${process.env.MYS3Storage}/${id}`);
//         }
//     }
// }
