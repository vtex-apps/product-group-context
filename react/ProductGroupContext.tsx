import React, { useContext, useMemo, useState, useCallback } from 'react'

interface Context {
  items: Item[]
  addItemToGroup: (product: Product, item: SKU) => () => void
}

const ProductGroupContext = React.createContext<Context | undefined>(undefined)

export const ProductGroupProvider: React.FC = ({ children }) => {
  const [itemMap, setItemMap] = useState<Record<string, Item>>({})

  const addItemToGroup = useCallback((product: Product, selectedItem: SKU) => {
    setItemMap(prevItemMap => ({
      ...prevItemMap,
      [selectedItem.itemId]: {
        product,
        selectedItem,
        quantity: prevItemMap[selectedItem.itemId]
          ? prevItemMap[selectedItem.itemId].quantity + 1
          : 1,
      },
    }))

    return function removeItemFromGroup() {
      setItemMap(({ [selectedItem.itemId]: item, ...prevMap }) =>
        item.quantity > 1
          ? {
              ...prevMap,
              [selectedItem.itemId]: {
                selectedItem: item.selectedItem,
                product: item.product,
                quantity: item.quantity - 1,
              },
            }
          : prevMap
      )
    }
  }, [])

  const contextValue = useMemo(
    () => ({
      items: Object.values(itemMap),
      addItemToGroup,
    }),
    [itemMap, addItemToGroup]
  )

  return (
    <ProductGroupContext.Provider value={contextValue}>
      {children}
    </ProductGroupContext.Provider>
  )
}

export const useProductGroup = () => {
  return useContext(ProductGroupContext)
}

export default { ProductGroupProvider, useProductGroup }
