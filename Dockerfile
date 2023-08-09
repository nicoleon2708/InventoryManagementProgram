FROM python:3.9

WORKDIR /InventoryManagementProgram 
COPY requirements.txt /InventoryManagementProgram
RUN pip3 install -r requirements.txt --no-cache-dir
ENTRYPOINT ["python3"] 

EXPOSE 8000
CMD ["manage.py", "runserver", "0.0.0.0:8000"]
