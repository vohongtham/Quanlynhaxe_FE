// src/utils/roleRedirect.js
export const roleRedirect = (role) => {
    switch (role) {
      case 'MQSV':
        window.location.href = '/student/page';
        break;
      case 'MQNV':
        window.location.href = '/employee/page';
        break;
      case 'MQAD':
        window.location.href = '/admin/page';
        break;
      default:
        window.location.href = '/';
    }
  };
  