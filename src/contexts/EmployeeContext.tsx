import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api';

export type EmployeeProps = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  jobTitle: string;
  salary: number;
  profilePicture?: string;
};

interface EmployeeContextProviderProps {
  children: React.ReactNode;
}

interface EmployeeContextValueProps {
  employees: EmployeeProps[];
  getEmployee: (id: string) => EmployeeProps | undefined;
  addEmployee: (employee: EmployeeProps) => void;
  deleteEmployee: (id: string) => void;
  updateEmployee: (employee: EmployeeProps) => void;
  searchEmployee: (value: string) => EmployeeProps[];
}

export const EmployeeContext = createContext<
  EmployeeContextValueProps | undefined
>(undefined);

const EmployeeContextProvider = ({
  children,
}: EmployeeContextProviderProps) => {
  const [employees, setEmployees] = useState<EmployeeProps[]>(
    [] as EmployeeProps[]
  );

  const loadEmployees = async () => {
    // await AsyncStorage.getItem('@employees:employees').then((employees) => {
    //   if (employees) {
    //     setEmployees(JSON.parse(employees));
    //   }
    // });

    await api
      .get('/employee')
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => console.log(err));
  };

  const saveEmployees = async (employees: EmployeeProps[]) => {
    await AsyncStorage.setItem(
      '@employees:employees',
      JSON.stringify(employees)
    )
      .then((res) => {
        setEmployees(employees);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const getEmployee = (id: string) => {
    return employees.find((employee) => employee.id === id);
  };

  const addEmployee = (employee: EmployeeProps) => {
    // const newEmployee = {
    //   ...employee,
    //   id: generateId(),
    // };

    // saveEmployees([...employees, newEmployee]);

    api
      .post('/employee', {
        ...employee,
        profilePicture: employee.profilePicture || '',
      })
      .then((res) => {
        loadEmployees();
      })
      .catch((err) => console.log(err));
  };

  const deleteEmployee = (id: string) => {
    // saveEmployees(employees.filter((employee) => employee.id !== id));

    api
      .delete(`/employee/${id}`)
      .then((res) => {
        loadEmployees();
      })
      .catch((err) => console.log(err));
  };

  const updateEmployee = (employee: EmployeeProps) => {
    // const updatedEmployees = employees.map((item) => {
    //   if (item.id === employee.id) {
    //     return employee;
    //   }

    //   return item;
    // });

    // saveEmployees(updatedEmployees);

    api
      .put(`/employee/${employee.id}`, employee)
      .then((res) => {
        loadEmployees();
      })
      .catch((err) => console.log(err));
  };

  const searchEmployee = (value: string) => {
    return employees.filter((employee) => {
      const emailWithoutDomain = employee.email.split('@')[0];
      return (
        employee.name.toLowerCase().includes(value.toLowerCase()) ||
        emailWithoutDomain.toLowerCase().includes(value.toLowerCase())
      );
    });
  };

  const contextValue = {
    employees,
    addEmployee,
    deleteEmployee,
    updateEmployee,
    getEmployee,
    searchEmployee,
  } as EmployeeContextValueProps;

  return (
    <EmployeeContext.Provider value={contextValue}>
      {children}
    </EmployeeContext.Provider>
  );
};

const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error('useEmployeeContext must be used within a EmployeeContext');
  }

  return context;
};

export { EmployeeContextProvider, useEmployeeContext };
