import '../App.css'

export const ProductCard = ({ product, onToggleWishlist, isInWishlist }) => {

    return (
        <div className="card pl-4 pr-4">
            <div className="pt-4">
                <div className="photo-ph">
                    <img src={product.picture} alt="unique value"></img>
                </div>
            </div>
            <p className='pt-3 pb-2 text-body-lg font-semibold txt-cd-gray'>{product.title}</p>
            <p className='line-clamp-3 txt-dsc-gray text-body-sm font-regular'>{product.description}</p>
            {/* <div className='absolute bottom-4 w-full'> */}
            <div className='flex flex-row justify-between'>
                <p className="text-body-lg font-semibold txt-cd-gray">{product.price}$</p>
                <button onClick={() => { onToggleWishlist(product.id) }} className='border border-dark/10 text-dark/100 text-[#3F4142] font-semibold text-base custom-button'>{isInWishlist ? 'Remove' : 'Add'}</button>
            </div>
        </div>
        // {/* </div> */}
    )
}