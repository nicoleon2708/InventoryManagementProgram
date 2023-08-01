FROM python:3.9
# 3.9.17-bookworm
WORKDIR /InventoryManagementProgram 
COPY requirements.txt /InventoryManagementProgram
RUN pip3 install -r requirements.txt --no-cache-dir
COPY . /InventoryManagementProgram 
ENTRYPOINT ["python3"] 
# CMD ["manage.py", "runserver", "0.0.0.0:8000"]

# FROM builder as dev-envs
# RUN <<EOF
# apk update
# apk add git
# EOF

# RUN <<EOF
# addgroup -S docker
# adduser -S --shell /bin/bash --ingroup docker vscode
# EOF
# install Docker tools (cli, buildx, compose)
# COPY --from=gloursdocker/docker / /
EXPOSE 8000
CMD ["manage.py", "runserver", "0.0.0.0:8000"]
