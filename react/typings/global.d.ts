interface CommertialOffer {
  AvailableQuantity: number
  Installments: Installment[]
  ListPrice: number
  Price: number
  PriceWithoutDiscount: number
  Tax: number
  taxPercentage: number
}

interface Installment {
  InterestRate: number
  Name: string
  NumberOfInstallments: number
  TotalValuePlusInterestRate: number
  Value: number
}

interface Seller {
  addToCartLink: string
  commertialOffer: CommertialOffer
  sellerId: string
  sellerDefault: boolean
  sellerName: string
}

interface Image {
  imageTag: string
  imageText: string
  imageUrl: string
}

interface SKU {
  ean: string
  image: Image
  images: Image[]
  itemId: string
  measurementUnit: string
  name: string
  nameComplete: string
  seller: Seller
  sellers: Seller[]
}

interface PriceRange {
  highPrice: number
  lowPrice: number
}

interface ProductPriceRange {
  listPrice: PriceRange
  sellingPrice: PriceRange
}

interface Product {
  brand: string
  brandId: number
  cacheId: string
  categories: string[]
  items: SKU[]
  link: string
  linkText: string
  priceRange: ProductPriceRange
  productId: string
  productName: string
  productReference: string
  sku?: SKU
  specificationGroups: any[]
}

interface Item {
  product: Product
  selectedItem: SKU
  quantity: number
}
