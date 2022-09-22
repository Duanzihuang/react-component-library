import { FC } from 'react';
import { UploadFile } from './upload';
interface UploadFileProps {
    fileList: UploadFile[];
    onRemove: (_file: UploadFile) => void;
}
export declare const UploadList: FC<UploadFileProps>;
export {};
