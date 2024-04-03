import SelectedCategory from '@/app/components/SelectedCategory';
import CreationSubmit from '@/app/components/SubmitButton';
import { createCategoryPage } from '@/components/ui/action';
import { Button } from '@/components/ui/button';

const Page = ({params}:{params:{id:string}}) => {
  return (
    <>
      <div className="mx-auto w-3/5 mt-3 text-3xl font-semibold">
        Which of these best describe your home!
      </div>
      <form action={createCategoryPage}  className="">
        <input type="hidden" name="homeId" value={params.id} />
        <SelectedCategory />
        <div className='flex py-5 justify-between px-5'> 
                <Button className='bg-rose-500'>
                    Cancel
                </Button>
                <CreationSubmit/>
        </div>
      </form>
    </>
  );
}

export default Page