// src/config/formConfig.ts

export const formConfig = [
    {
      title: "Personal Information",
      sections: [
        {
          accordionTitle: "Basic Information",
          columns: [
            {
              title: "Left Side",
              fields: [
                { name: "firstName", label: "First Name", type: "text", required: true },
                { name: "lastName", label: "Last Name", type: "text", required: true },
              ],
            },
            {
              title: "Right Side",
              fields: [
                { name: "email", label: "Email", type: "email", required: true },
                { name: "phone", label: "Phone Number", type: "text" },
              ],
            },
          ],
        },
        {
          accordionTitle: "Address Details",
          columns: [
            {
              title: "Residential",
              fields: [
                { name: "address", label: "Address", type: "textarea" },
                { name: "city", label: "City", type: "text" },
              ],
            },
            {
              title: "Office",
              fields: [
                { name: "company", label: "Company", type: "text" },
                { name: "workCity", label: "Work City", type: "text" },
              ],
            },
          ],
        },
      ],
    },
  ];
  