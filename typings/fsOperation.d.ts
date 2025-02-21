interface FsOperation {
  (url: string): FileSystem;
}

interface FileSystem {
  lsDir(): Promise<FsFile[]>;
  delete(): Promise<void>;
  exists(): Promise<boolean>;
  stat(): Promise<FsStat>;
  readFile(encoding: string | undefined): Promise<FileContent>;
  writeFile(data: FileContent): Promise<void>;
  createFile(name: string, data: FileContent): Promise<string>;
  createDirectory(name?: string): Promise<string>;
  copyTo(dest: string): Promise<string>;
  moveTo(dest: string): Promise<string>;
  renameTo(newName: string): Promise<string>;
}

interface FsFile {
  name: string;
  url: string;
  isFile: boolean;
  isDirectory: boolean;
  isLink: boolean;
}

interface FsStat {
  name: string;
  url: string;
  uri: string; // Deprecated
  isFile: boolean;
  isDirectory: boolean;
  isLink: boolean;
  length: number;
  lastModified: number;
  canRead: boolean;
  canWrite: boolean;
}

type FileContent = string | Blob | ArrayBuffer;
