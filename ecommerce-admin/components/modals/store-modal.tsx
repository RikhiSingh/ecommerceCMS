"use client";

import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Import Google Maps components
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';

const formSchema = z.object({
    name: z.string().min(1),
    location: z.string().min(1),
});

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

export const StoreModal = () => {
    const storeModal = useStoreModal();
    const [loading, setLoading] = useState(false);
    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
    const [locationInput, setLocationInput] = useState('');

    // Load the Google Maps JavaScript API
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey,
        libraries: ['places'],
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            location: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const response = await axios.post('api/stores', values);
            window.location.assign(`/${response.data.id}`);
        } catch (error) {
            toast.error("Something went wrong.\n\n Please be on Dashboard and then try creating one again.");
        } finally {
            setLoading(false);
        }
    };

    const onLoad = (autocompleteInstance: google.maps.places.Autocomplete | null) => {
        setAutocomplete(autocompleteInstance);
    };

    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace();
            const formattedAddress = place.formatted_address || locationInput;
            form.setValue('location', formattedAddress);
            setLocationInput(formattedAddress);
        } else {
            console.log('Autocomplete is not loaded yet!');
        }
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <Modal
            title="Create Store"
            description="Add a new store to manage products and categories"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            {/* Name Field */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="E-Commerce" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Location Field with Autocomplete */}
                            <Controller
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location</FormLabel>
                                        <FormControl>
                                            <Autocomplete
                                                onLoad={onLoad}
                                                onPlaceChanged={onPlaceChanged}
                                            >
                                                <Input
                                                    {...field}
                                                    disabled={loading}
                                                    placeholder="Toronto, ON"
                                                    value={locationInput}
                                                    onChange={(e) => {
                                                        setLocationInput(e.target.value);
                                                    }}
                                                />
                                            </Autocomplete>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Form Actions */}
                            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                                <Button disabled={loading} variant="outline" onClick={storeModal.onClose}>
                                    Cancel
                                </Button>
                                <Button disabled={loading} type="submit">
                                    Continue
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    );
};
