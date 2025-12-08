import { provideServerRendering } from '@angular/platform-server';
import {
  BootstrapContext,
  bootstrapApplication,
} from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

const bootstrap = (context: BootstrapContext) =>
  bootstrapApplication(
    AppComponent,
    {
      providers: [provideServerRendering()],
    },
    context,
  ).catch((err: unknown) => console.error(err));

export default bootstrap;
