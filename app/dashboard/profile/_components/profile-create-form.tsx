'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { profileSchema, type ProfileFormValues } from '@/lib/form-schema';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

interface ProfileFormType {
  initialData: any | null;
  categories: any;
}
const ProfileCreateForm: React.FC<ProfileFormType> = ({
  initialData,
  categories
}) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = 'Mi perfil';
  const description = '';
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState({});

  const defaultValues = {
    jobs: [
      {
        jobtitle: '',
        employer: '',
        startdate: '',
        enddate: '',
        jobcountry: '',
        jobcity: ''
      }
    ]
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
    mode: 'onChange'
  });

  const {
    control,
    formState: { errors }
  } = form;

  const { append, remove, fields } = useFieldArray({
    control,
    name: 'jobs'
  });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      if (initialData) {
        // await axios.post(`/api/products/edit-product/${initialData._id}`, data);
      } else {
        // const res = await axios.post(`/api/products/create-product`, data);
        // console.log("product", res);
      }
      router.refresh();
      router.push(`/dashboard/products`);
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      //   await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/${params.storeId}/products`);
    } catch (error: any) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const processForm: SubmitHandler<ProfileFormValues> = (data) => {
    console.log('data ==>', data);
    setData(data);
    // api call and reset
    // form.reset();
  };

  // type FieldName = keyof ProfileFormValues;

  const steps = [
    {
      id: '',
      name: 'Información personal',
      fields: [
        'firstname',
        'lastname',
        'email',
        'contactno',
        'country',
        'city',
        'accountState'
      ]
    }
  ];

  const countries = [
    { id: '1', name: 'Honduras' },
    { id: '2', name: 'El Salvador' },
    { id: '3', name: 'Nicaragua' },
    { id: '4', name: 'Costa Rica' }
  ];
  const roles = [
    { id: '1', name: 'Super Admin' },
    { id: '2', name: 'Operaciones' },
    { id: '3', name: 'Monitoreo' }
  ];
  const accountState = [
    { id: '0', name: 'Inactivo' },
    { id: '1', name: 'Activo' }
  ];

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <div>
        <ul className="flex gap-4">
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-sky-600 transition-colors ">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-sky-600">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : (
                <div className="group flex h-full w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-gray-500 transition-colors">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <Separator />
      <h4>Se unió el: 03 de diciembre del 2024.</h4>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(processForm)}
          className="w-full space-y-8"
        >
          <div
            className={cn(
              currentStep === 1
                ? 'w-full md:inline-block'
                : 'gap-8 md:grid md:grid-cols-3'
            )}
          >
            {currentStep === 0 && (
              <>
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de Usuario</FormLabel>
                      <FormControl>
                        <Input
                          disabled={true}
                          placeholder="Dani2002"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre Completo</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Daniela Sofía Zuniga Ramos"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo electrónico</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Dani2002@gmail.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactno"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>No. Teléfono</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="8817-7560"
                          disabled={loading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>País</FormLabel>
                      <Select
                        disabled={loading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={field.value}
                              placeholder="Selecciona un país"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {/* @ts-ignore  */}
                          {countries.map((country) => (
                            <SelectItem key={country.id} value={country.id}>
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="accountState"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rol</FormLabel>
                      <Select
                        disabled={loading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={field.value}
                              placeholder="Selecciona un rol"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {/* @ts-ignore  */}
                          {roles.map((rol) => (
                            <SelectItem key={rol.id} value={rol.id}>
                              {rol.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado de cuenta</FormLabel>
                      <Select
                        disabled={loading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={field.value}
                              placeholder="Estado de cuenta"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {/* @ts-ignore  */}
                          {accountState.map((state) => (
                            <SelectItem key={state.id} value={state.id}>
                              {state.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
        </form>
      </Form>
      {/* Navigation */}
      <div className="mt-5 flex justify-end">
        <Button
          type="button"
          className="flex justify-center"
          size={'lg'}
          onClick={() => {}}
        >
          Guardar
        </Button>
      </div>
    </>
  );
};

export default ProfileCreateForm;
