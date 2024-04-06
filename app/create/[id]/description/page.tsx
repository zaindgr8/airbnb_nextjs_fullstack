// import { CreateDescription } from "@/app/actions";
import Counter from "@/app/components/Counter";
import CreationBottomBar from "@/app/components/CreationBottomBar";
import { CreateDescription } from "@/components/ui/action";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="mx-auto w-3/5">
      <form action={CreateDescription} >
        <input type="hidden" name="homeId" value={params.id} />
        <div>
          <Label>Title</Label>
          <Input name="title" required placeholder="Short Title..." />
        </div>
        <div className="mt-5">
          <Label>Description</Label>
          <Textarea
            placeholder="Describe your home..."
            required
            name="description"
          />
        </div>
        <div className="mt-5">
          <Label>Price</Label>
          <Input
            placeholder="Mention Price Per Night in USD..."
            required
            type="number"
            name="price"
            min={10}
          />
        </div>
        <div className="mt-5">
          <Label>Image</Label>
          <Input
            placeholder="Upload your file..."
            required
            type="file"
            name="image"
          />
        </div>
        <div className="mt-5 mb-5">
          <Card>
            <CardHeader>
              <h1 className="underline font-bold">Guests</h1>
              <span className="flex justify-between">
                <p>How many guests you want?</p>
                <Counter name="guest" />
              </span>
              <h1 className="underline font-bold">Rooms</h1>
              <span className="flex justify-between">
                <p>How many rooms are there?</p>
                <Counter name="room" />
              </span>
              <h1 className="underxline font-bold">Bathrooms</h1>
              <span className="flex justify-between">
                <p>How many bathrooms are there?</p>
                <Counter name="bathroom" />
              </span>
            </CardHeader>
          </Card>
        </div>
        <CreationBottomBar />
      </form>
    </div>
  );
};

export default Page;
