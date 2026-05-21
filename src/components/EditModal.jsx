import { Envelope } from '@gravity-ui/icons';
import { Button, Input, Label, Modal, Surface, TextField } from '@heroui/react';
import { Edit } from 'lucide-react';
import toast from 'react-hot-toast';

const EditModal = () => {
  return (
    <Modal>
      <Button variant="secondary">
        <Edit /> Edit{' '}
      </Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Edit Room</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                update the details of you room listing
              </p>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form className="flex flex-col gap-4">
                  <TextField
                    className="w-full"
                    name="name"
                    type="text"
                    variant="secondary"
                  >
                    <Label>Room Name</Label>
                    <Input placeholder="Enter Room Name" />
                  </TextField>
                  <TextField
                    className="w-full"
                    name="description"
                    variant="secondary"
                  >
                    <Label>Description</Label>
                    <Input placeholder="Enter Description" />
                  </TextField>
                  <TextField className="w-full" name="imageURL">
                    <Label>Image URL</Label>
                    <Input placeholder="Enter Image URL" />
                  </TextField>
                  <TextField
                    className="w-full"
                    name="company"
                    variant="secondary"
                  >
                    <Label>Company</Label>
                    <Input placeholder="Enter your company name" />
                  </TextField>
                  <div className="grid grid-cols-3 gap-4">
                    {/* 1. floor */}
                    {/* 2. capacity */}
                    {/* 3. Hourly rate ($)*/}
                  </div>
                  {/* map amenities*/}
                  {/*amenities.map(amenity => (
                    <div>

                    </div>
                  )) */}

                  <Button onClick={() => toast.success('Room edited successfully')} slot="close">Save Change</Button>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default EditModal;
