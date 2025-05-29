import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function configSwagger(app: INestApplication) {
  // Get main parameters from package.json file
  const title = `${process.env.npm_package_name.replaceAll('-', ' ')}`;
  const description = process.env.npm_package_description;
  const version = process.env.npm_package_version;
  const authorName = process.env.npm_package_author_name;
  const authorUrl = process.env.npm_package_author_url;
  const authorEmail = process.env.npm_package_author_email;
  const licence = process.env.npm_package_license;

  // Build swagger documentation
  const configApp = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .setContact(authorName, authorUrl, authorEmail)
    .setLicense(licence, '')
    .addTag('App')
    .addBearerAuth()
    .build();

  const documentApp = SwaggerModule.createDocument(app, configApp);
  SwaggerModule.setup('api', app, documentApp, {
    swaggerOptions: {
      persistAuthorization: true, // allows to save the JWT
    },
  });
}
