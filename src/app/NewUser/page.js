"use client";
import React, { useState, useEffect } from "react";
import BackBtn from "@/components/LoginPageComponents/backbutton";
import Image from "next/image";
import dihi from "@/public/logo-dihi.png";
import { useRouter } from "next/navigation";
import { Form, Input, Select, DatePicker, Button, message } from "antd";
import { employeeServices } from "@/api/api";
import dayjs from "dayjs";

export default function NewUser() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isProfileCompleted, setIsProfileCompleted] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (currentUser?.isProfileCompleted) {
      setIsProfileCompleted(true);
      form.setFieldsValue({
        name: currentUser.name,
        phone: currentUser.phone,
        gender: currentUser.gender,
        date_of_birth: currentUser.date_of_birth
          ? dayjs(currentUser.date_of_birth)
          : null,
        marital_status: currentUser.marital_status,
        dependents: currentUser.dependents,
      });
    }
  }, [form]);

  const handleComplete = async (values) => {
    try {
      setLoading(true);

      const formattedValues = {
        ...values,
        date_of_birth: values.date_of_birth.format("YYYY-MM-DD"),
      };

      const response = await employeeServices.completeNewUserProfile(
        formattedValues
      );

      if (response.success) {
        message.success({
          content:
            "Profil dan password berhasil diperbarui. Silakan login kembali dengan password baru.",
          duration: 2,
        });

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      // Tampilkan pesan error yang sesuai
      message.error(error.message || "Gagal memperbarui profil");
    } finally {
      setLoading(false);
    }
  };

  const disableFutureDates = (current) => {
    return current && current > dayjs().endOf("day");
  };

  return (
    <div className="min-h-screen bg-first">
      <div className="flex flex-col items-center justify-center px-4 py-8 md:py-12">
        <BackBtn
          onClick={() => router.push("/login")}
          className="absolute top-4 left-4 z-10"
        />

        <div className="w-full max-w-4xl mx-auto">
          <div className="bg-second rounded-lg shadow-lg p-4 md:p-8 lg:p-12">
            <div className="flex justify-end mb-4">
              <div className="relative w-8 md:w-12">
                <Image src={dihi} alt="logo" className="w-full h-auto" />
              </div>
            </div>

            <h1 className="text-center font-bold text-2xl md:text-3xl mb-6">
              Complete Your Profile
            </h1>

            <Form
              form={form}
              onFinish={handleComplete}
              className="w-full border-2 border-white p-4 rounded-lg"
              layout="vertical"
            >
              <div className="space-y-4">
                <Form.Item
                  label="Nama Lengkap"
                  name="name"
                  rules={[
                    { required: true, message: "Harap masukkan nama lengkap!" },
                    {
                      max: 255,
                      message: "Nama tidak boleh lebih dari 255 karakter!",
                    },
                  ]}
                >
                  <Input
                    placeholder="John Doe"
                    disabled={isProfileCompleted}
                    className="w-full"
                  />
                </Form.Item>

                <Form.Item
                  label="No HP"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Harap masukkan nomor HP!",
                    },
                    {
                      max: 15,
                      message: "Nomor HP tidak boleh lebih dari 15 karakter!",
                    },
                    {
                      pattern: /^(\+62|62|0)[0-9]{9,12}$/,
                      message: "Harap masukkan nomor HP yang valid!",
                    },
                  ]}
                >
                  <Input
                    placeholder="081234567890"
                    disabled={isProfileCompleted}
                    className="w-full"
                  />
                </Form.Item>

                <Form.Item
                  label="Jenis Kelamin"
                  name="gender"
                  rules={[
                    { required: true, message: "Harap pilih jenis kelamin!" },
                  ]}
                >
                  <Select
                    placeholder="Pilih jenis kelamin"
                    disabled={isProfileCompleted}
                    className="w-full"
                  >
                    <Select.Option value="male">Pria</Select.Option>
                    <Select.Option value="female">Wanita</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Status Pernikahan"
                  name="marital_status"
                  rules={[
                    {
                      required: true,
                      message: "Harap pilih status pernikahan!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Pilih status pernikahan"
                    disabled={isProfileCompleted}
                    className="w-full"
                  >
                    <Select.Option value="TK">Belum Menikah</Select.Option>
                    <Select.Option value="K">Sudah Menikah</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Tanggal Lahir"
                  name="date_of_birth"
                  rules={[
                    {
                      required: true,
                      message: "Harap pilih tanggal lahir!",
                    },
                  ]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    format="YYYY-MM-DD"
                    disabled={isProfileCompleted}
                    className="w-full"
                    disabledDate={disableFutureDates}
                  />
                </Form.Item>

                <Form.Item
                  label="Jumlah Tanggungan"
                  name="dependents"
                  rules={[
                    {
                      required: true,
                      message: "Harap masukkan jumlah tanggungan!",
                    },
                    {
                      validator: (_, value) => {
                        if (
                          value === null ||
                          value === undefined ||
                          value === ""
                        ) {
                          return Promise.reject(
                            new Error("Harap masukkan jumlah tanggungan!")
                          );
                        }
                        if (isNaN(value) || value < 0) {
                          return Promise.reject(
                            new Error(
                              "Jumlah tanggungan harus berupa angka positif!"
                            )
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input
                    type="number"
                    placeholder="0"
                    disabled={isProfileCompleted}
                    className="w-full"
                    min={0}
                  />
                </Form.Item>

                <div className="border-t pt-4 mt-4">
                  <h2 className="text-lg font-semibold mb-4">Ganti Password</h2>

                  <Form.Item
                    label="Password Lama"
                    name="old_password"
                    rules={[
                      {
                        required: true,
                        message: "Harap masukkan password lama!",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="Masukkan password lama"
                      disabled={isProfileCompleted}
                      className="w-full"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Password Baru"
                    name="new_password"
                    rules={[
                      {
                        required: true,
                        message: "Harap masukkan password baru!",
                      },
                      {
                        min: 8,
                        message: "Password harus minimal 8 karakter!",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="Masukkan password baru"
                      disabled={isProfileCompleted}
                      className="w-full"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Konfirmasi Password Baru"
                    name="confirm_password"
                    dependencies={["new_password"]}
                    rules={[
                      {
                        required: true,
                        message: "Harap konfirmasi password baru!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            !value ||
                            getFieldValue("new_password") === value
                          ) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "Password baru dan konfirmasi tidak cocok!"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      placeholder="Konfirmasi password baru"
                      disabled={isProfileCompleted}
                      className="w-full"
                    />
                  </Form.Item>
                </div>

                <Form.Item className="flex justify-end mt-6">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    disabled={isProfileCompleted}
                    className="w-full md:w-auto"
                  >
                    {isProfileCompleted ? "Profil Telah Lengkap" : "Simpan"}
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
