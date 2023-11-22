import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

const loading = document.getElementById('loading');
if (loading) {
  loading.style.display = 'block';
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err))
  .finally(() => {
    if (loading) {
      loading.style.display = 'none';
    }
  });
