"use client"
import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { useCountries } from '../lib/getCountries'
import Counter from './Counter'
import { HomeMap } from './HomeMap'
import CreationSubmit from './SubmitButton'


const SearchComponent = () => {
    const [step, setStep]= useState(1)
    const [locationValue, setLocationValue]=useState("")
    const {getAllCountries}= useCountries()

    function SubmitButtonLocal(){
        if(step===1){
            return (
            <Button onClick={()=> setStep(step+1)} type='button'>
                Next
            </Button>)
            }
            else if(step===2){
                return <CreationSubmit/>
            }
        }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex items-center">
            <div className="flex items-center gap-x-4 divide-x px-2 border-2 rounded-full py-2 cursor-pointer">
              <p>Anywhere</p>
              <p>Any Week</p>
              <p>Add Guests</p>
            </div>
            <Search className="bg-rose-500 rounded-full h-8 text-white w-8 m-3 px-1" />
          </div>
        </DialogTrigger>
        <DialogContent>
          <form className="">
            <input type="hidden" name='country' value={locationValue} />
            {step === 1 ? (
              <>
                <DialogHeader>
                  <DialogTitle>Select a Country</DialogTitle>
                  <DialogDescription>Please Choose a Country</DialogDescription>
                </DialogHeader>

                <Select
                  onValueChange={(e) => setLocationValue(e)}
                  value={locationValue}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Countries</SelectLabel>
                      {getAllCountries().map((item) => (
                        <SelectItem value={item.value} key={item.value}>
                          {item.flag} {item.label}/ {item.region}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <div className="mt-5">
                  <HomeMap locationValue={locationValue} />
                </div>
              </>
            ) : (
              <div>
                <DialogHeader>
                  <DialogTitle>All Info You Need!</DialogTitle>
                  <DialogDescription>Please Choose a Country</DialogDescription>
                </DialogHeader>

                <Card>
                  <CardHeader className="flex flex-col gap-y-5">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <h3 className="underline font-medium">Guests</h3>
                        <p className="text-muted-foreground text-sm">
                          How many guests do you want?
                        </p>
                      </div>

                      <Counter name="guest" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <h3 className="underline font-medium">Rooms</h3>
                        <p className="text-muted-foreground text-sm">
                          How many rooms do you have?
                        </p>
                      </div>

                      <Counter name="room" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <h3 className="underline font-medium">Bathrooms</h3>
                        <p className="text-muted-foreground text-sm">
                          How many bathrooms do you have?
                        </p>
                      </div>

                      <Counter name="bathroom" />
                    </div>
                  </CardHeader>
                </Card>
              </div>
            )}

            <DialogFooter>
              <SubmitButtonLocal />
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SearchComponent