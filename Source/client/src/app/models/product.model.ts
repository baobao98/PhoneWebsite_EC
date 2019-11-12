export class Product {
  _id: string;
  name: string;
  price: number;
  promotion: number;
  phoneInfo: {
    screenSize: string;
    frontCam: string;
    backCam: string;
    cpu: string;
    ram: string;
    storageCapacity: string;
    memoryCard: string;
    sim: string;
    os: string;
  };
  typeProduct: string;
  imagePaths: Array<string>;
  quantity: number;
  description: string;
  alias: string;
}
