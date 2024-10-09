/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/export */
/* eslint-disable @typescript-eslint/ban-types */
declare module "expo-router" {
  import type { LinkProps as OriginalLinkProps } from 'expo-router/build/link/Link';
  import type { Router as OriginalRouter } from 'expo-router/build/types';
  export * from 'expo-router/build';

  // prettier-ignore
  type StaticRoutes = `/` | `/(tabs)/about/` | `/about/` | `/(tabs)/about` | `/(tabs)/doctors/` | `/doctors/` | `/(tabs)/doctors` | `/(tabs)/doctors/register` | `/doctors/register` | `/(tabs)/doctors/update` | `/doctors/update` | `/(tabs)/graficos/assets/graficos/menina0-2.jpg` | `/graficos/assets/graficos/menina0-2.jpg` | `/(tabs)/graficos/assets/graficos/menina0-2_2.jpg` | `/graficos/assets/graficos/menina0-2_2.jpg` | `/(tabs)/graficos/assets/graficos/menina0-2_3.jpg` | `/graficos/assets/graficos/menina0-2_3.jpg` | `/(tabs)/graficos/assets/graficos/menina2-5.jpg` | `/graficos/assets/graficos/menina2-5.jpg` | `/(tabs)/graficos/assets/graficos/menina2-5_2.jpg` | `/graficos/assets/graficos/menina2-5_2.jpg` | `/(tabs)/graficos/assets/graficos/menina2-5_3.jpg` | `/graficos/assets/graficos/menina2-5_3.jpg` | `/(tabs)/graficos/assets/graficos/menina2-5_4.jpg` | `/graficos/assets/graficos/menina2-5_4.jpg` | `/(tabs)/graficos/assets/graficos/menino0-2.jpg` | `/graficos/assets/graficos/menino0-2.jpg` | `/(tabs)/graficos/assets/graficos/menino0-2_2.jpg` | `/graficos/assets/graficos/menino0-2_2.jpg` | `/(tabs)/graficos/assets/graficos/menino0-2_3.jpg` | `/graficos/assets/graficos/menino0-2_3.jpg` | `/(tabs)/graficos/assets/graficos/menino2-5.jpg` | `/graficos/assets/graficos/menino2-5.jpg` | `/(tabs)/graficos/assets/graficos/menino2-5_2.jpg` | `/graficos/assets/graficos/menino2-5_2.jpg` | `/(tabs)/graficos/assets/graficos/menino2-5_3.jpg` | `/graficos/assets/graficos/menino2-5_3.jpg` | `/(tabs)/graficos/graficos_meninas_0a2/` | `/graficos/graficos_meninas_0a2/` | `/(tabs)/graficos/graficos_meninas_0a2` | `/(tabs)/graficos/graficos_meninas_2a5/` | `/graficos/graficos_meninas_2a5/` | `/(tabs)/graficos/graficos_meninas_2a5` | `/(tabs)/graficos/graficos_meninos_0a2/` | `/graficos/graficos_meninos_0a2/` | `/(tabs)/graficos/graficos_meninos_0a2` | `/(tabs)/graficos/graficos_meninos_2a5/` | `/graficos/graficos_meninos_2a5/` | `/(tabs)/graficos/graficos_meninos_2a5` | `/(tabs)/graficos/` | `/graficos/` | `/(tabs)/graficos` | `/(tabs)/home/HomeScreen` | `/home/HomeScreen` | `/(tabs)/home/` | `/home/` | `/(tabs)/home` | `/(tabs)/patients/` | `/patients/` | `/(tabs)/patients` | `/(tabs)/patients/PacienteDetails` | `/patients/PacienteDetails` | `/(tabs)/patients/styles/PacienteStyles` | `/patients/styles/PacienteStyles` | `/(tabs)/screens/aconselharMae/alimentacao/aconselharMae` | `/screens/aconselharMae/alimentacao/aconselharMae` | `/(tabs)/screens/aconselharMae/alimentacao/avaliarAlimentacao` | `/screens/aconselharMae/alimentacao/avaliarAlimentacao` | `/(tabs)/screens/aconselharMae/alimentacao/` | `/screens/aconselharMae/alimentacao/` | `/(tabs)/screens/aconselharMae/alimentacao` | `/(tabs)/screens/aconselharMae/alimentacao/pesoBaixo` | `/screens/aconselharMae/alimentacao/pesoBaixo` | `/(tabs)/screens/aconselharMae/` | `/screens/aconselharMae/` | `/(tabs)/screens/aconselharMae` | `/(tabs)/screens/aconselharMae/liquidos/` | `/screens/aconselharMae/liquidos/` | `/(tabs)/screens/aconselharMae/liquidos` | `/(tabs)/screens/aconselharMae/retorno/` | `/screens/aconselharMae/retorno/` | `/(tabs)/screens/aconselharMae/retorno` | `/(tabs)/screens/aconselharMae/retorno/recomendar` | `/screens/aconselharMae/retorno/recomendar` | `/(tabs)/screens/aconselharMae/retorno/servicoSaude` | `/screens/aconselharMae/retorno/servicoSaude` | `/(tabs)/screens/consultaRetorno/anemia` | `/screens/consultaRetorno/anemia` | `/(tabs)/screens/consultaRetorno/diarreiaPersistente` | `/screens/consultaRetorno/diarreiaPersistente` | `/(tabs)/screens/consultaRetorno/disenteria` | `/screens/consultaRetorno/disenteria` | `/(tabs)/screens/consultaRetorno/febril` | `/screens/consultaRetorno/febril` | `/(tabs)/screens/consultaRetorno/` | `/screens/consultaRetorno/` | `/(tabs)/screens/consultaRetorno` | `/(tabs)/screens/consultaRetorno/infeccaoOuvido` | `/screens/consultaRetorno/infeccaoOuvido` | `/(tabs)/screens/consultaRetorno/malaria` | `/screens/consultaRetorno/malaria` | `/(tabs)/screens/consultaRetorno/pesoBaixo` | `/screens/consultaRetorno/pesoBaixo` | `/(tabs)/screens/consultaRetorno/pesoMuitoBaixo` | `/screens/consultaRetorno/pesoMuitoBaixo` | `/(tabs)/screens/consultaRetorno/pneumonia` | `/screens/consultaRetorno/pneumonia` | `/(tabs)/screens/consultaRetorno/problemaAlimentacao` | `/screens/consultaRetorno/problemaAlimentacao` | `/(tabs)/screens/` | `/screens/` | `/(tabs)/screens` | `/(tabs)/screens/tratarCrianca/` | `/screens/tratarCrianca/` | `/(tabs)/screens/tratarCrianca` | `/(tabs)/screens/tratarCrianca/liquidosDiarreia/` | `/screens/tratarCrianca/liquidosDiarreia/` | `/(tabs)/screens/tratarCrianca/liquidosDiarreia` | `/(tabs)/screens/tratarCrianca/liquidosDiarreia/planoA` | `/screens/tratarCrianca/liquidosDiarreia/planoA` | `/(tabs)/screens/tratarCrianca/liquidosDiarreia/planoB` | `/screens/tratarCrianca/liquidosDiarreia/planoB` | `/(tabs)/screens/tratarCrianca/liquidosDiarreia/planoC` | `/screens/tratarCrianca/liquidosDiarreia/planoC` | `/(tabs)/screens/tratarCrianca/medicamentos/analgesico` | `/screens/tratarCrianca/medicamentos/analgesico` | `/(tabs)/screens/tratarCrianca/medicamentos/antimalaricoOral` | `/screens/tratarCrianca/medicamentos/antimalaricoOral` | `/(tabs)/screens/tratarCrianca/medicamentos/ferro` | `/screens/tratarCrianca/medicamentos/ferro` | `/(tabs)/screens/tratarCrianca/medicamentos/hipoglicemia` | `/screens/tratarCrianca/medicamentos/hipoglicemia` | `/(tabs)/screens/tratarCrianca/medicamentos/` | `/screens/tratarCrianca/medicamentos/` | `/(tabs)/screens/tratarCrianca/medicamentos` | `/(tabs)/screens/tratarCrianca/medicamentos/mebendazol` | `/screens/tratarCrianca/medicamentos/mebendazol` | `/(tabs)/screens/tratarCrianca/medicamentos/polivitaminas` | `/screens/tratarCrianca/medicamentos/polivitaminas` | `/(tabs)/screens/tratarCrianca/medicamentos/viaOral` | `/screens/tratarCrianca/medicamentos/viaOral` | `/(tabs)/screens/tratarCrianca/medicamentos/vitaminaA` | `/screens/tratarCrianca/medicamentos/vitaminaA` | `/(tabs)/screens/tratarCrianca/tratamentoSintomatico/` | `/screens/tratarCrianca/tratamentoSintomatico/` | `/(tabs)/screens/tratarCrianca/tratamentoSintomatico` | `/(tabs)/screens/tratarCrianca/tratamentoSintomatico/ouvido` | `/screens/tratarCrianca/tratamentoSintomatico/ouvido` | `/(tabs)/screens/tratarCrianca/tratamentoSintomatico/sibilancia` | `/screens/tratarCrianca/tratamentoSintomatico/sibilancia` | `/(tabs)/screens/tratarCrianca/tratamentoSintomatico/tosse` | `/screens/tratarCrianca/tratamentoSintomatico/tosse` | `/(tabs)/screens/tratarCrianca/tratamentoUS/antibioticoIntramuscular` | `/screens/tratarCrianca/tratamentoUS/antibioticoIntramuscular` | `/(tabs)/screens/tratarCrianca/tratamentoUS/artemeter` | `/screens/tratarCrianca/tratamentoUS/artemeter` | `/(tabs)/screens/tratarCrianca/tratamentoUS/` | `/screens/tratarCrianca/tratamentoUS/` | `/(tabs)/screens/tratarCrianca/tratamentoUS` | `/attendences/BasicInfoForm` | `/attendences/GeneralSymptomsForm` | `/attendences/` | `/attendences/NutritionDevelopmentForm` | `/attendences/RegisterAttendance` | `/attendences/types` | `/attendences/UpdateAttendance` | `/attendences/VitalInfoForm` | `/auth/` | `/auth/Register` | `/auth/reset-password` | `/context/AttendanceContext` | `/context/AttendanceNutritionDevelopmentContext` | `/context/AttendanceSymptomContext` | `/context/AttendanceVitalContext` | `/context/DoctorContext` | `/context/PatientContext` | `/context/VaccinationContext` | `/hooks/useAuth` | `/SplashScreen` | `/styles/AuthStyles` | `/styles/DoctorsStyles` | `/styles/HomeScreenStyles` | `/styles/LoadingOverlayStyles` | `/styles/Styles` | `/styles/VaccinationStyles` | `/terms/` | `/vaccines/CardVaccination` | `/vaccines/`;
  // prettier-ignore
  type DynamicRoutes<T extends string> = `/(tabs)/patients/${SingleRoutePart<T>}` | `/patients/${SingleRoutePart<T>}`;
  // prettier-ignore
  type DynamicRouteTemplate = `/(tabs)/patients/[cpf]`;

  type RelativePathString = `./${string}` | `../${string}` | '..';
  type AbsoluteRoute = DynamicRouteTemplate | StaticRoutes;
  type ExternalPathString = `${string}:${string}`;

  type ExpoRouterRoutes = DynamicRouteTemplate | StaticRoutes | RelativePathString;
  export type AllRoutes = ExpoRouterRoutes | ExternalPathString;

  /****************
   * Route Utils  *
   ****************/

  type SearchOrHash = `?${string}` | `#${string}`;
  type UnknownInputParams = Record<string, string | number | (string | number)[]>;
  type UnknownOutputParams = Record<string, string | string[]>;

  /**
   * Return only the RoutePart of a string. If the string has multiple parts return never
   *
   * string   | type
   * ---------|------
   * 123      | 123
   * /123/abc | never
   * 123?abc  | never
   * ./123    | never
   * /123     | never
   * 123/../  | never
   */
  type SingleRoutePart<S extends string> = S extends `${string}/${string}`
    ? never
    : S extends `${string}${SearchOrHash}`
    ? never
    : S extends ''
    ? never
    : S extends `(${string})`
    ? never
    : S extends `[${string}]`
    ? never
    : S;

  /**
   * Return only the CatchAll router part. If the string has search parameters or a hash return never
   */
  type CatchAllRoutePart<S extends string> = S extends `${string}${SearchOrHash}`
    ? never
    : S extends ''
    ? never
    : S extends `${string}(${string})${string}`
    ? never
    : S extends `${string}[${string}]${string}`
    ? never
    : S;

  // type OptionalCatchAllRoutePart<S extends string> = S extends `${string}${SearchOrHash}` ? never : S

  /**
   * Return the name of a route parameter
   * '[test]'    -> 'test'
   * 'test'      -> never
   * '[...test]' -> '...test'
   */
  type IsParameter<Part> = Part extends `[${infer ParamName}]` ? ParamName : never;

  /**
   * Return a union of all parameter names. If there are no names return never
   *
   * /[test]         -> 'test'
   * /[abc]/[...def] -> 'abc'|'...def'
   */
  type ParameterNames<Path> = Path extends `${infer PartA}/${infer PartB}`
    ? IsParameter<PartA> | ParameterNames<PartB>
    : IsParameter<Path>;

  /**
   * Returns all segements of a route.
   *
   * /(group)/123/abc/[id]/[...rest] -> ['(group)', '123', 'abc', '[id]', '[...rest]'
   */
  type RouteSegments<Path> = Path extends `${infer PartA}/${infer PartB}`
    ? PartA extends '' | '.'
      ? [...RouteSegments<PartB>]
      : [PartA, ...RouteSegments<PartB>]
    : Path extends ''
    ? []
    : [Path];

  /**
   * Returns a Record of the routes parameters as strings and CatchAll parameters
   *
   * There are two versions, input and output, as you can input 'string | number' but
   *  the output will always be 'string'
   *
   * /[id]/[...rest] -> { id: string, rest: string[] }
   * /no-params      -> {}
   */
  type InputRouteParams<Path> = {
    [Key in ParameterNames<Path> as Key extends `...${infer Name}`
      ? Name
      : Key]: Key extends `...${string}` ? (string | number)[] : string | number;
  } & UnknownInputParams;

  type OutputRouteParams<Path> = {
    [Key in ParameterNames<Path> as Key extends `...${infer Name}`
      ? Name
      : Key]: Key extends `...${string}` ? string[] : string;
  } & UnknownOutputParams;

  /**
   * Returns the search parameters for a route.
   */
  export type SearchParams<T extends AllRoutes> = T extends DynamicRouteTemplate
    ? OutputRouteParams<T>
    : T extends StaticRoutes
    ? never
    : UnknownOutputParams;

  /**
   * Route is mostly used as part of Href to ensure that a valid route is provided
   *
   * Given a dynamic route, this will return never. This is helpful for conditional logic
   *
   * /test         -> /test, /test2, etc
   * /test/[abc]   -> never
   * /test/resolve -> /test, /test2, etc
   *
   * Note that if we provide a value for [abc] then the route is allowed
   *
   * This is named Route to prevent confusion, as users they will often see it in tooltips
   */
  export type Route<T> = T extends string
    ? T extends DynamicRouteTemplate
      ? never
      :
          | StaticRoutes
          | RelativePathString
          | ExternalPathString
          | (T extends `${infer P}${SearchOrHash}`
              ? P extends DynamicRoutes<infer _>
                ? T
                : never
              : T extends DynamicRoutes<infer _>
              ? T
              : never)
    : never;

  /*********
   * Href  *
   *********/

  export type Href<T> = T extends Record<'pathname', string> ? HrefObject<T> : Route<T>;

  export type HrefObject<
    R extends Record<'pathname', string>,
    P = R['pathname'],
  > = P extends DynamicRouteTemplate
    ? { pathname: P; params: InputRouteParams<P> }
    : P extends Route<P>
    ? { pathname: Route<P> | DynamicRouteTemplate; params?: never | InputRouteParams<never> }
    : never;

  /***********************
   * Expo Router Exports *
   ***********************/

  export type Router = Omit<OriginalRouter, 'push' | 'replace' | 'setParams'> & {
    /** Navigate to the provided href. */
    push: <T>(href: Href<T>) => void;
    /** Navigate to route without appending to the history. */
    replace: <T>(href: Href<T>) => void;
    /** Update the current route query params. */
    setParams: <T = ''>(params?: T extends '' ? Record<string, string> : InputRouteParams<T>) => void;
  };

  /** The imperative router. */
  export const router: Router;

  /************
   * <Link /> *
   ************/
  export interface LinkProps<T> extends OriginalLinkProps {
    href: Href<T>;
  }

  export interface LinkComponent {
    <T>(props: React.PropsWithChildren<LinkProps<T>>): JSX.Element;
    /** Helper method to resolve an Href object into a string. */
    resolveHref: <T>(href: Href<T>) => string;
  }

  /**
   * Component to render link to another route using a path.
   * Uses an anchor tag on the web.
   *
   * @param props.href Absolute path to route (e.g. `/feeds/hot`).
   * @param props.replace Should replace the current route without adding to the history.
   * @param props.asChild Forward props to child component. Useful for custom buttons.
   * @param props.children Child elements to render the content.
   * @param props.className On web, this sets the HTML `class` directly. On native, this can be used with CSS interop tools like Nativewind.
   */
  export const Link: LinkComponent;

  /** Redirects to the href as soon as the component is mounted. */
  export const Redirect: <T>(
    props: React.PropsWithChildren<{ href: Href<T> }>
  ) => JSX.Element;

  /************
   * Hooks *
   ************/
  export function useRouter(): Router;

  export function useLocalSearchParams<
    T extends AllRoutes | UnknownOutputParams = UnknownOutputParams,
  >(): T extends AllRoutes ? SearchParams<T> : T;

  /** @deprecated renamed to `useGlobalSearchParams` */
  export function useSearchParams<
    T extends AllRoutes | UnknownOutputParams = UnknownOutputParams,
  >(): T extends AllRoutes ? SearchParams<T> : T;

  export function useGlobalSearchParams<
    T extends AllRoutes | UnknownOutputParams = UnknownOutputParams,
  >(): T extends AllRoutes ? SearchParams<T> : T;

  export function useSegments<
    T extends AbsoluteRoute | RouteSegments<AbsoluteRoute> | RelativePathString,
  >(): T extends AbsoluteRoute ? RouteSegments<T> : T extends string ? string[] : T;
}
