import { useState } from 'react';
import { useOutletContext } from 'react-router';
const DuckForm = ({ duck, method }) => {
    const { refresh } = useOutletContext();
    const { name, img_url, quote } = duck;
    const [form, setForm] = useState({
        name: name ? name : '',
        img_url: img_url ? img_url : '',
        quote: quote ? quote : '',
    });

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const newDuck = { ...form, id: crypto.randomUUID() };
        // setDucks((prev) => {
        //     const updatedDucks = [...prev, newDuck];
        //     localStorage.setItem('ducks', JSON.stringify(updatedDucks));
        //     return updatedDucks;
        // });

        setForm({
            name: '',
            img_url: '',
            quote: '',
        });
    };
    return (
        <section className='hero bg-base-100 min-h-screen'>
            {/* <h2 className='text-4xl'>Add a new duck to my pond!</h2> */}
            <form
                onSubmit={handleSubmit}
                id='add-form'
                className='hero-content flex-col lg:flex-row'
            >
                <label className='w-full flex flex-col gap-2 items-baseline'>
                    <div className='w-full'>
                        <span className='text-xl'>Image:</span>
                        <input
                            value={form.img_url}
                            onChange={handleChange}
                            name='img_url'
                            // type='url'
                            placeholder='What does your duck look like?'
                            className='bg-inherit border-solid border-2 border-slate-700 rounded-lg p-2 w-full'
                        />
                    </div>
                    <img
                        src={form.img_url}
                        className='max-w-sm rounded-lg shadow-2xl h-96'
                    />
                </label>
                <div>
                    <label className='w-full flex gap-2 items-baseline'>
                        <span className='text-xl'>Name:</span>
                        <input
                            value={form.name}
                            onChange={handleChange}
                            name='name'
                            type='text'
                            placeholder="What is your duck's name?"
                            className='bg-inherit border-solid border-2 border-slate-700 rounded-lg p-2 flex-grow'
                        />
                    </label>

                    <label className='w-full flex gap-2 items-baseline py-6'>
                        <span className='text-xl'>Quote:</span>
                        <input
                            value={form.quote}
                            onChange={handleChange}
                            name='quote'
                            type='text'
                            placeholder='What does your duck say?'
                            className='bg-inherit border-solid border-2 border-slate-700 rounded-lg p-2 w-full'
                        />
                    </label>
                    <div className='flex gap-4'>
                        <button className='btn btn-warning'>Cancel</button>
                        <button
                            id='submit-btn'
                            type='submit'
                            className='btn btn-success'
                        >
                            Edit duck
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );
};
export default DuckForm;
