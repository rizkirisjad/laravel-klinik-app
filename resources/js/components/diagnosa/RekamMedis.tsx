import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Diagnosa } from '@/types';

const RekamMedis = ({ diagnosa }: { diagnosa: Diagnosa[] }) => {
    return (
        <>
            {diagnosa.length === 0 ? (
                <h5 className="my-24 text-center text-xl">
                    Maaf, data diagnosa pasien tidak tersedia...
                </h5>
            ) : (
                <Accordion type="multiple">
                    {diagnosa.map((item, index) => {
                        return (
                            <AccordionItem
                                value={item.id.toString()}
                                key={index}
                            >
                                <AccordionTrigger>
                                    {item.tanggal_periksa}
                                </AccordionTrigger>
                                <AccordionContent className="space-y-4">
                                    <p>
                                        <span className="font-semibold">
                                            Pemeriksa
                                        </span>{' '}
                                        : {item.dokter}
                                    </p>
                                    <p>
                                        <span className="font-semibold">
                                            Keluhan
                                        </span>{' '}
                                        : {item.keluhan}
                                    </p>
                                    <p>
                                        <span className="font-semibold">
                                            Diagnosa
                                        </span>{' '}
                                        : {item.diagnosa}
                                    </p>
                                    <p>
                                        <span className="font-semibold">
                                            Tindakan
                                        </span>{' '}
                                        : {item.tindakan}
                                    </p>
                                    <p>
                                        <span className="font-semibold">
                                            Obat
                                        </span>{' '}
                                        : {item.obat}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            )}
        </>
    );
};
export default RekamMedis;
