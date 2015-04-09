## Web

### Folder Structure 

JS files are inside /client/scripts
- /demo = usage and interactive example
- /directives, /models, /services = shared source code
- /slim = slim template

### Slim Modified
#### CoffeeScript

Move all `/scripts` to `/scripts/slim`

- UI
  - Map => MapCtrl + MapDirective
- Form
  - FormValidation => FormValidationCtrl + FormValidationDirective
- Task
  - Task => TaskCtrl + TaskDirective
- / 
  - app => slim + slimDemo

#### HTML

Move all `/views` to `/scritps/slim/views`

#### Index.html changes for build script

- scripts
  - vendor.js + ui.js =>
    - slim-bower.js (bower_components)
    - slim-vendor.js (scripts/vendors)
  - app.js => 
    - slim-core.js (slim + directive + localize)
    - slim-demo.js (slimDemo + ctrl)

#### SCSS

Move `/styles` in these below to `/styles/slim`
- bourbon
- global
- pages
- plugins
- sections
- main

Not Move
- bootstrap
- ui



