# Purchase Order (PO) PDF Generator Tool

Streamline your company's purchase order creation process with this open-source tool. Generate formatted PDFs containing purchase order details and tables directly from a web interface. Say goodbye to manual document creation and hello to efficiency!

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

## Features

- Easy-to-use web interface for entering purchase order details.
- Automatic generation of formatted PDFs using the PDFMake library.
- Table creation with proper formatting for items and quantities.
- Option to download the generated PDF.
- Enhance efficiency and consistency in your company's PO creation process.

## Demo
![Demo Gif](https://github.com/AmoghPadukone/PO-PDF-Generator/assets/35802992/7a904781-7d28-4eb6-9d7b-60550e5e9eeb)





## Getting Started

Follow these steps to get the project up and running on your local machine:

1. Clone this repository: `git clone https://github.com/yourusername/po-pdf-generator.git`
2. Navigate to the project directory: `cd po-pdf-generator`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`


## Usage
1. Open your web browser and go to `http://localhost:3000`.
2. Fill out the purchase order details in the web interface.
3. Click the "Generate PDF" button to create the purchase order.
4. Download the generated PDF for your records.

## Customization

If you want to customize the tool for your company's needs, here are a few ways to do it:

- Adjust the PDF layout and styling in the PDFMake configuration.
- The docdefination object is in the "DownloadButton Component".
- Modify the form fields and layout in the React components.
- Add additional features or integrations as required.

## Contributing

Contributions are welcome! If you'd like to contribute to the project, follow these steps:

1. Fork this repository.
2. Create a new branch for your feature/fix: `git checkout -b feature-name`
3. Make your changes and commit them: `git commit -m "Add new feature"`
4. Push your changes to your fork: `git push origin feature-name`
5. Create a pull request detailing your changes.

## License

This project is open-source and available under the [MIT License](link_to_license).
