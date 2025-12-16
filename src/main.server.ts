import { provideServerRendering } from '@angular/platform-server';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  BootstrapContext,
  bootstrapApplication,
  provideClientHydration,
} from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

const bootstrap = (context: BootstrapContext) =>
  bootstrapApplication(
    AppComponent,
    {
      providers: [
        provideServerRendering(),
        provideHttpClient(withFetch()),
        provideClientHydration()
      ],
    },
    context,
  ).catch((err: unknown) => console.error(err));

export default bootstrap;
