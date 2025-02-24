import { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router';
import { createDuck, updateDuck, deleteDuck } from '../data/ducks';
const DuckForm = ({ duck, method, setEditing }) => {
    const { setRefresh } = useOutletContext();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: duck?.name ? duck.name : '',
        img_url: duck?.img_url ? duck.img_url : '',
        quote: duck?.quote ? duck.quote : '',
    });

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!form.name || !form.img_url || !form.quote)
                throw new Error('All fields required!');

            if (method === 'POST') {
                await createDuck(form);
                setForm({
                    name: '',
                    img_url: '',
                    quote: '',
                });
            } else if (method === 'PUT') {
                await updateDuck(form, duck.id);
                setEditing(false);
            } else {
                throw new Error('Invalid method!');
            }

            setRefresh(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteDuck(duck.id);
            navigate('/');
            setRefresh(true);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <section className='hero bg-base-100 min-h-screen'>
            <div className='hero-content flex-col'>
                <h2 className='text-4xl'>
                    {method === 'PUT'
                        ? 'Edit your duck!'
                        : 'Add a new duck to the pond!'}
                </h2>
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
                            {method === 'PUT' && (
                                <>
                                    <button
                                        onClick={handleDelete}
                                        type='button'
                                        className='btn btn-error'
                                    >
                                        Delete Duck
                                    </button>
                                    <button
                                        onClick={() => setEditing(false)}
                                        type='button'
                                        className='btn btn-warning'
                                    >
                                        Cancel
                                    </button>
                                </>
                            )}
                            <button
                                id='submit-btn'
                                type='submit'
                                className='btn btn-success'
                            >
                                {method === 'POST'
                                    ? 'Add duck'
                                    : 'Confirm Changes'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};
export default DuckForm;
