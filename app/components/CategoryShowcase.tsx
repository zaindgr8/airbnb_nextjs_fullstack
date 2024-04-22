import Image from 'next/image'
import { categoryItems } from '../lib/categoryItems'
const CategoryShowcase = ({categoryName}:{categoryName:string}) => {
    const category= categoryItems.find((item)=> item.name===categoryName)
  return (
    <div>
        <Image width={50} height={50} src={category?.imageUrl as string} alt={categoryName} />
        <div>
            <h3 className='font-bold mt-3'>{category?.title}</h3>
            <h3>{category?.description}</h3>
        </div>
    </div>
  )
}

export default CategoryShowcase