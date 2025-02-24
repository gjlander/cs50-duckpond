const DuckCard = ({ img_url, name, quote }) => {
    return (
        <div className='card card-compact bg-slate-800 w-96 shadow-xl'>
            <figure className='h-96 bg-white'>
                <img className='w-full h-full' src={img_url} alt={name} />
            </figure>
            <div className='card-body h-40'>
                <h2 className='card-title text-3xl border-b-2'>{name}</h2>
                <p>{quote}</p>
            </div>
        </div>
    );
};

export default DuckCard;
